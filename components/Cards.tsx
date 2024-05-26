"use client"
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/Card';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { Loader } from 'lucide-react';

const Cards = ({ characters, locations, episodes, selectedStatus }: { characters: [], locations: any, episodes: any, selectedStatus: string }) => {
    const characterLoading = useSelector((state: RootState) => state.character.loading);
    const locationLoading = useSelector((state: RootState) => state.location.loading);
    const episodeLoading = useSelector((state: RootState) => state.episode.loading);
    let results = [];
    const selectedItems = useSelector((state: RootState) => state.selected.selectedItems);
    const [isClickable, setIsClickable] = useState(true);
    useEffect(() => {
        if (selectedItems.length > 2) {
            setIsClickable(false);
        }
    }, [selectedItems])
    if (selectedStatus?.label === 'Character') {
        results = characters;
    } else if (selectedStatus?.label === 'Location') {
        results = locations;
    } else if (selectedStatus?.label === 'Episode') {
        results = episodes;
    }
    const isLoading = characterLoading || locationLoading || episodeLoading;

    return (
        <div className='mt-3 p-3 h-[450px] overflow-auto rounded'>
            {isLoading ? (
                <div className="flex justify-center items-center h-full flex-col gap-3">
                    <div>
                        <Loader />
                    </div>
                    <p className='text-lg'>Loading</p>
                </div>
            ) : (
                results.map((item: any) => (
                    <Card key={item.id} item={item} isClickable={isClickable} checkedProp={selectedItems.some((selectedItem: any) => selectedItem.name === item.name)} />
                ))
            )}
        </div>
    );
}

export default Cards;
