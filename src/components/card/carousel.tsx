/**
 * Represents a Carousel card UI component.
 * @component
 * @example
 * <Carousel
 *   setIsOpen={()=> void}
 *   selected ={selected}
 *   setIsEditModal={setIsEditModal}
 * />
 */

import { useContext, useMemo, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard } from "swiper/modules";
import { parse, format, compareAsc } from 'date-fns';
import { CalendarContext } from '../../contexts/calendar-context';
import { Rating } from '@smastrom/react-rating'
import type { Swiper as SwiperType } from 'swiper';
import { Trash, SquarePen, Plus } from 'lucide-react';




type CalendarContextType = {
    setIsOpen: (val: boolean) => void
    selected: string;
    setEditData: React.Dispatch<React.SetStateAction<JournalType | undefined>>;
    setIsEditModal: (val: boolean) => void;
}

const Carousel = ({ setIsOpen, selected, setIsEditModal, setEditData }: CalendarContextType) => {
    const { journalData, setJournalData } = useContext(CalendarContext);

    const modalSwiperRef = useRef<SwiperType>(null);

    const sorted = useMemo(() => {
        return [...journalData].sort((a, b) => {
            const da = parse(a.date, 'dd/MM/yyyy', new Date());
            const db = parse(b.date, 'dd/MM/yyyy', new Date());
            return compareAsc(da, db);
        });
    }, [journalData]);


    const selectedIndex = useMemo(() => {
        const idx = sorted.findIndex((x) => x.id === selected);
        return idx < 0 ? 0 : idx;
    }, [sorted, selected]);


    useEffect(() => {
        if (modalSwiperRef.current) {
            const handle = requestAnimationFrame(() => {
                modalSwiperRef.current?.slideTo(selectedIndex, 0);
            });
            return () => cancelAnimationFrame(handle);
        }
    }, [selectedIndex]);

    const handleDelete = (id: string) => {
        const filteredData = journalData.filter((dt) => dt.id != id);
        setJournalData(filteredData);
    }

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
            }}
            className='absolute top-0 left-0 w-full overflow-hidden z-50 h-screen bg-black/40 flex items-center justify-center'>

            <div onClick={() => setIsOpen(false)} className='w-8 h-8 absolute right-10 top-15 z-50 rounded-full bg-gray-600 flex items-center justify-center'>
                <Plus color='white' />
            </div>
            <div
                onClick={(e) => e.stopPropagation()}
                className='flex justify-center overflow-hidden items-center !h-[60vh] md:!h-1/2  relative '>
                <Swiper
                    modules={[Keyboard]}
                    keyboard={{ enabled: true }}
                    centeredSlides
                    grabCursor
                    initialSlide={selectedIndex}
                    onSwiper={(sw) => (modalSwiperRef.current = sw)}
                    slidesPerView={1.7}
                    breakpoints={{
                        640: { slidesPerView: 1.15, spaceBetween: 20 },
                        768: { slidesPerView: 1.25, spaceBetween: 24 },
                        1024: { slidesPerView: 1.35, spaceBetween: 28 },
                    }}
                    className=" h-full"
                >
                    {sorted.map((dt) => {
                        const parsedDate = parse(dt.date, 'dd/MM/yyyy', new Date())
                        // format it to "d MMMM" → "5 August"
                        const journalDate = format(parsedDate, 'd MMMM')

                        return (
                            <SwiperSlide key={dt.id} style={{ overflow: 'hidden', width: '50%', height: "100%", margin: 'auto 0' }}>
                                <div className=' bg-white h-full rounded-md overflow-hidden'>
                                    <img src={dt.imgUrl} className='h-[60%] w-full object-cover md:object-contain' />

                                    <div className='flex flex-col justify-between flex-wrap h-[40%] py-2 '>
                                        <div className='px-4 pb-0 space-y-0.5'>
                                            <div className='flex justify-end'>
                                                <Rating style={{ width: 50 }} value={Math.floor(dt.rating)} />
                                            </div>

                                            <div className='flex items-center justify-between'>
                                                <h1 className='text-left font-semibold text-gray-600'>{journalDate}</h1>
                                                <div className='flex items-center gap-2'>
                                                    <SquarePen onClick={() => {
                                                        setEditData(dt);
                                                        setIsEditModal(true)
                                                    }} size={12} className='cursor-pointer' />
                                                    <Trash onClick={() => handleDelete(dt.id)} size={12} className='cursor-pointer' />
                                                </div>
                                            </div>
                                            <h1 className='text-left text-sm leading-4 text-gray-500'>{dt.description.split(" ").slice(0, 18).join(" ")}</h1>
                                        </div>
                                        <hr className=' h-[1.5px] text-gray-400 bg-gray-400' />
                                        <h1 className='text-center my-0 font-semibold'>View full Post</h1>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>

        </div>
    )
}

export default Carousel