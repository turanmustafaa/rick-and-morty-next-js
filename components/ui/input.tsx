"use client"
import * as React from "react";
import { cn } from "@/lib/utils";
import { useEffect,useState } from "react";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import {removeItem } from '@/lib/store/selectedSlice';
import { useDispatch } from "react-redux";



interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  selectedStatus: any;
  onSearch: (type: string, query: string) => void;
}


const Input = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, type, selectedStatus, onSearch, ...props }, ref) => {
    const [value, setValue] = React.useState("");
    const dispatch = useDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && selectedStatus) {
        onSearch(selectedStatus.value, value);
      }
      else if(e.key === "Backspace" && value === "" && selectedItems.length > 0) {
        const lastChild = selectedItems[selectedItems.length - 1];
        dispatch(removeItem(lastChild));
      }
    };
    const [paddingClass, setPaddingClass] = useState('');
    const selectedItems = useSelector((state: RootState) => state.selected.selectedItems);

   
    useEffect(() => {
      if (selectedItems.length === 0) {
        setPaddingClass("pl-[12px]");
      }
      else if (selectedItems.length === 1) {
        setPaddingClass("pl-[110px]");
      } else if (selectedItems.length === 2) {
        setPaddingClass("pl-[220px]");
      }
      else if (selectedItems.length === 3) {
        setPaddingClass("pl-[330px]");
      }
    }, [selectedItems]);
    return selectedStatus ? (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-",
          className,
          paddingClass
        )}
        ref={ref}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...props}
      />
    ) : (
      <p className="text-gray-500 col-span-6 text-sm">
        İlk önce dropdown selectten bir option seçiniz
      </p>
    );
  }
);

Input.displayName = "Input";

export { Input };
