import { useState, useEffect } from 'react';
import { Repo, User, UserState } from './App.types';

export const useGithubUser = (userName: string) => {
    const [state, setState] = useState<UserState>({
        user: null,
        error: '',
        loading: false
    });

    useEffect(() => {
        if (userName) {
            (async () => {
                try {
                    setState({ ...state, loading: true });
                    const result = await fetch(
                        `https://api.github.com/search/users?q=${userName}`
                    );
                    result.json().then(async(response: User) => {
                        if (response.total_count) {
                            let user = response;
                            const repos: Repo[] = await getUserRepos(user.items[0].repos_url);
                            user.repos = repos;
                            setState({ ...state, user, loading: false, error: '' });
                        } else {
                            setState({
                                ...state,
                                error: 'User Not Found',
                                user: null,
                                loading: false
                            });
                        }
                    });
                    } catch(error) {
                        setState({ ...state, error: 'An error has occured'});
                    }
                })();
        }
    }, [userName]);

    const getUserRepos = async (url: string) => {
         try {
            const repos = await fetch(url);
            return repos.json().then((response: Repo[]) => {
                return response;
            });
         } catch(error) {
             return [];
         }
    }

    return state;
}
