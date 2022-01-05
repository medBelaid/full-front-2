import { userInfo } from 'os';
import { useState } from 'react';
import './App.css';
import { Repo, UserItem } from './App.types';
import Spinner from './components/Spinner';
import { showErrorMessage } from './helpers/alert';
import { useGithubUser } from './useGithubUser';

function App() {
  const [userName, setUserName] = useState('');
  const [tempUserName, setTempUserName] = useState('');
  const { user, error, loading } = useGithubUser(userName);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempUserName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserName(tempUserName);
  };

  const userInfo = (items: UserItem[], repos: Repo[]) => (
    <div className='Container'>
      <section className='user-info'>
        <ul>
          <li><span>Login:</span> <a href={items[0].html_url}>{items[0].login}</a></li>
          <li><span>Score:</span> {items[0].score}</li>
          <li>
            <span>Repos:</span>
            {repos.length !== 0 ? (
            <ul>
              {repos.map((r: Repo) => <li className='repo' key={r.id}>
                <a href={r.html_url}>{r.name}</a>
                <span style={{ color: r.private ? '#00C851' : '#ff4444' }}>
                  {r.private ? 'private' : 'public'}
                </span>
                {r.description && <p>{r.description}</p>}
              </li>)}
            </ul>
            ) : showErrorMessage('No Repos yet')}
            
          </li>
        </ul>
      </section>
      <section><img src={items[0].avatar_url} /></section>
    </div>
  );

  const searchForm = () => (
    <form onSubmit={handleSubmit}>
        <input
            value={tempUserName}
            onChange={handleChange}
            className="form-control"
            placeholder="user name"
            required
        />
        <button>Search</button>
    </form>
  );
  
  return (
    <div className="App">
      {searchForm()}
      {user && userInfo(user.items, user.repos)}
      {loading && <Spinner />}
      {error && showErrorMessage(error)}
    </div>
  );
}

export default App;
