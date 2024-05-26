import React from 'react'
import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';
import { XIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { removeItem } from '@/lib/store/selectedSlice';

const InputItems = () => {
    const dispatch = useDispatch();
    const selectedItems = useSelector((state: RootState) => state.selected.selectedItems);
    return (
        <div className='flex flex-row gap-2 px-4 mt-[-44px] h-6'>
            {selectedItems.map((item) => (
                <div key={item.name} className='w-[100px] flex items-center bg-slate-200 px-2 py-1 rounded'>
                    <p className='w-3/4 overflow-hidden text-ellipsis text-nowrap text-xs'>
                        {item.name}
                    </p>
                    <div className='w-1/4 bg-slate-300 flex items-center justify-center rounded-sm' onClick={() => dispatch(removeItem(item))}>
                        <XIcon width={15} height={15} className='p-0.5' />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default InputItems