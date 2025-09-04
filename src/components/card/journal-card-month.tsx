/**
 * Represents a Journal card UI component.
 * @component
 * @example
 * <JournalCard
 *   monthDate={Sat May 03 2025 00:32:10 GMT+0530 (India Standard Time)}
 * />
 */

import { useState, useEffect, useRef } from 'react';
import { Rating } from '@smastrom/react-rating';
import Carousel from './carousel';
import { JournalDialog } from '@/components/sections/journal-dialog';

type JournalCardMonth = {
  imgUrl: string;
  rating: number;
  id: string;
}

export default function JournalCardMonth({ imgUrl, rating, id }: JournalCardMonth) {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('');
  const [isEditModal, setIsEditModal] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [editData, setEditData] = useState<JournalType | undefined>(undefined);
  const lastUrlRef = useRef<string | null>(null);

  const handleImageChange = (file: File | null) => {
    if (lastUrlRef.current) {
      URL.revokeObjectURL(lastUrlRef.current)
      lastUrlRef.current = null
    }
    if (file) {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
      lastUrlRef.current = url
    } else {
      setImageUrl(null)
    }
  }


  // cleanup on unmount to avoid leaking the object URL
  useEffect(() => {
    return () => {
      if (lastUrlRef.current) URL.revokeObjectURL(lastUrlRef.current)
    }
  }, [])

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

      {isOpen && <Carousel
        setIsEditModal={setIsEditModal}
        setEditData={setEditData} setIsOpen={setIsOpen} selected={selected} />}
      {
        isEditModal && <JournalDialog
          handleImageChange={handleImageChange}
          isOpen={isEditModal}
          setIsOpen={setIsEditModal}
          setImageUrl={setImageUrl}
          mode='edit'
          imageUrl={imageUrl}
          initialEntry={editData}
        />
      }
    </div>
  )
}

