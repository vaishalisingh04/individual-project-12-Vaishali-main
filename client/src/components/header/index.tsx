import React from 'react';
import useHeader from '../../hooks/useHeader'; // Import the custom hook
import './index.css';

/**
 * Interface representing the props for the Header component.
 *
 * - search - The initial search query string used to populate the input field.
 * - setQuestionPage - Callback function that navigates to the search results page.
 *                           It takes the search query and a title as arguments.
 */
interface HeaderProps {
  search: string; // The initial search query string
  setQuestionPage: (query: string, title: string) => void; // Function to navigate to the search results page
}

/**
 * Header component that renders the main title and a search bar.
 * The search bar allows the user to input a query and navigate to the search results page
 * when they press Enter.
 *
 * @param search The initial search query string used to populate the input field.
 * @param setQuestionPage Callback function that navigates to the search results page.
 */
const Header: React.FC<HeaderProps> = ({ search, setQuestionPage }) => {
  // Use the useHeader hook
  const { searchQuery, handleInputChange, handleKeyDown } = useHeader({
    initialSearch: search,
    setQuestionPage,
  });

  return (
    <div id='header' className='header'>
      <div></div>
      <div className='title'>Fake Stack Overflow</div>
      <input
        id='searchBar'
        placeholder='Search ...'
        type='text'
        value={searchQuery} // Bind the input value to the hook's state
        onChange={handleInputChange} // Attach the input change handler from the hook
        onKeyDown={handleKeyDown} // Attach the key down handler from the hook
      />
    </div>
  );
};

export default Header;
