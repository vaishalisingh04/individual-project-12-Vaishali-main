import { useEffect, useState } from 'react';
import { Tag } from '../types'; // Adjust import path as needed
import { getTagByName } from '../services/tagService'; // Adjust import path as needed

interface UseTagSelectedProps {
  tagName: string;
}

/**
 * Custom hook to fetch and manage the state of a selected tag.
 *
 * @param tagName - The name of the tag to fetch.
 * @returns An object containing the tag data.
 */
const useTagSelected = ({ tagName }: UseTagSelectedProps) => {
  const [tag, setTag] = useState<Tag>({
    name: '',
    description: '',
  });

  useEffect(() => {
    const fetchTag = async () => {
      try {
        const res = await getTagByName(tagName);
        setTag(res || { name: 'Error', description: 'Error' });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e); // Log the error to the console
      }
    };
    fetchTag();
  }, [tagName]);

  return { tag };
};

export default useTagSelected;
