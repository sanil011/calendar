/**
 * Represents a Journal card UI component.
 * @component
 * @example
 * <JournalCard
 *   monthDate={Sat May 03 2025 00:32:10 GMT+0530 (India Standard Time)}
 * />
 */

import { useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import Carousel from './carousel';


type JournalCardMonth = {
  imgUrl: string;
  rating: number;
  id: string;
}

export default function JournalCardMonth({ imgUrl, rating, id }: JournalCardMonth) {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('');

  const handleClick = () => {
    setIsOpen(true);
    setSelected(id)
  }

  return (
    <div onClick={handleClick} key={id} className="flex items-center flex-col">
      <Rating style={{ width: 30 }} value={Math.floor(rating)} />
      <div className="h-12 w-11/12">
        <img src={imgUrl} className="object-contain h-full w-full" />
      </div>

      {isOpen && <Carousel setIsOpen={setIsOpen} selected={selected} />}

    </div>
  )
}

