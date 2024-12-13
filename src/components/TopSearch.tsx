import SearchBar from './SearchBar';
import LoginButton from './welcome';

const TopSearch = () => {
    return(
    <header className="header">
        <div className="search-bar">
            <SearchBar />
        </div>
        <LoginButton />
    </header>
    );
};

export default TopSearch;