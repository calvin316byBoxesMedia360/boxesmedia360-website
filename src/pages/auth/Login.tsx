                    <h1 className="text-3xl font-bold text-indigo-600">BoxesOS</h1>
                    <p className="mt-2 text-gray-500">
                        {isLogin ? 'Sign in to your account' : 'Create a new account'}
                    </p>
                </div >

    { error && (
        <div className="p-3 text-sm text-red-600 bg-red-100 rounded-md">
            {error}
        </div>
    )}

<form onSubmit={handleSubmit} className="space-y-6">
    <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail className="w-5 h-5 text-gray-400" />
            </div>
            <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border"
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
            </button>
        </form>

        <div className="text-center">
            <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-indigo-600 hover:text-indigo-500"
            >
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
        </div>
    </div >
</div >
    );
};

export default Login;
