"use client"

import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { useDispatch } from 'react-redux';
import { addItem, removeItem } from '@/lib/store/selectedSlice';
import { useEffect, useRef } from "react";
export function Card({ item, checkedProp, isClickable }: { item: any, checkedProp: any, isClickable: boolean }) {
  const dispatch = useDispatch();
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkedProp) {
      checkboxRef?.current?.setAttribute('data-state', 'checked')
    }
  }, [])
  const handleSelectItem = () => {
    const isChecked = checkboxRef?.current?.getAttribute('data-state') === 'checked';
    if (isChecked) {
      dispatch(removeItem(item));
      return;
    }
    dispatch(addItem(item));
  };

  useEffect(() => {
  }, [isClickable])

  return (
    <div className="items-top flex space-x-2 py-2" style={{ pointerEvents: isClickable ? "auto" : "none" }}>
      <Checkbox id={`terms-${item.id}`} onClick={handleSelectItem} ref={checkboxRef} />
      <div className="grid gap-1.5 leading-none">
        <label htmlFor={`terms-${item.id}`} className="flex gap-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {item.image && (
            <div>
              <Image src={item.image} width={40} height={40} alt={'avatar'} />
            </div>
          )}
          <div>
            <p>{item.name}</p>
            {item.status && item.species && (
              <p className="text-sm text-muted-foreground">
                {item.status} - {item.species}
              </p>
            )}
          </div>
        </label>
      </div>
    </div>
  )
}
