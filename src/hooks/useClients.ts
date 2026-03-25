import { useState, useEffect } from 'react';
import {
    collection,
    query,
    onSnapshot,
    addDoc,
    doc,
    orderBy,
    Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface Client {
    id: string;
    name: string;
    company: string;
    phone: string;
    email: string;
    taxId: string;
    location: string;
    mapLink: string;
    createdAt?: any;
}

export const useClients = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const q = query(collection(db, 'clients'), orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const clientsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Client[];

            setClients(clientsData);
            setLoading(false);
        }, (err) => {
            console.error("Error fetching clients:", err);
            setError("Failed to load clients.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const addClient = async (client: Omit<Client, 'id'>) => {
        try {
            await addDoc(collection(db, 'clients'), {
                ...client,
                createdAt: Timestamp.now()
            });
        } catch (err) {
            console.error("Error adding client:", err);
            throw err;
        }
    };

    return { clients, loading, error, addClient };
};

export const useClient = (id: string | undefined) => {
    const [client, setClient] = useState<Client | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        const unsubscribe = onSnapshot(doc(db, 'clients', id), (doc) => {
            if (doc.exists()) {
                setClient({ id: doc.id, ...doc.data() } as Client);
            } else {
                setError("Client not found");
            }
            setLoading(false);
        }, (err) => {
            console.error("Error fetching client:", err);
            setError("Failed to load client");
            setLoading(false);
        });

        return () => unsubscribe();
    }, [id]);

    return { client, loading, error };
};
