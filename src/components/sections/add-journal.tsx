import { useState, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { JournalDialog } from './journal-dialog';
import { cn } from '@/lib/utils';
/**
 * Represents a Add journal Button  component.
 * @component
 * @example
 * <AddJournal
 * />
 */

const AddJournal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const lastUrlRef = useRef<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null)

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

    return (
        <div>
            <div id='add-journal-btn' onClick={() => setIsOpen(true)} className={cn('absolute bottom-[10%] right-[10%] bg-blue-400 w-10 h-10 rounded-full flex items-center justify-center',)}>
                <Plus className='text-white' />
            </div>
            <JournalDialog
                handleImageChange={handleImageChange}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
            />
        </div>
    )
}

export default AddJournal