"use client"
import { useEffect, useState } from 'react';
import Cards from "@/components/Cards";
import { Input } from "@/components/ui/input";
import { DropdownSelect, DropdownOption } from "@/components/DropdownSelect";
import { fetchCharacters } from '@/lib/store/characterSlice';
import { fetchEpisodes } from '@/lib/store/episodeSlice';
import { fetchLocations } from '@/lib/store/locationSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import InputItems from '@/components/InputItems';
import { useRef } from 'react';
import { Character, Location, Episode } from '@/constants/types'; 

export default function Home() {
  const [selectedStatus, setSelectedStatus] = useState<DropdownOption | null>(null);
  const dispatch = useAppDispatch();
  const handleSearch = (type: string, query: string) => {
    if (type === "character") {
      dispatch(fetchCharacters(query));
    } else if (type === "location") {
      dispatch(fetchLocations(query));
    } else if (type === "episode") {
      dispatch(fetchEpisodes(query));
    }
  };
  const InputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (InputRef.current) {
      InputRef.current.value = '';
      if (selectedStatus?.value === "character") {
        InputRef.current.placeholder = "Lütfen character ismini giriniz";
      } else if (selectedStatus?.value === "location") {
        InputRef.current.placeholder = "Lütfen location ismini giriniz";
      } else if (selectedStatus?.value === "episode") {
        InputRef.current.placeholder = "Lütfen bölümleri arasına virgül koyarak giriniz";
      }
    }
  }, [selectedStatus]);
  const characterResults = useAppSelector(state => state.character.characters) as Character[];
  const locationResults = useAppSelector(state => state.location.locations) as Location[];
  const episodeResults = useAppSelector(state => state.episode.episodes) as Episode[];

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">
      <section className="min-w-[500px] w-fit bg-white min-h-[500px] rounded border border-gray-100">
        <div className="grid grid-cols-8 p-3 gap-3 items-center">
          <Input ref={InputRef}
            className="col-span-6"
            selectedStatus={selectedStatus}
            onSearch={handleSearch}
          />
          <div className="col-span-2 max-w-full">
            <DropdownSelect
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />
          </div>
        </div>
        <InputItems />
        <Cards
          characters={characterResults}
          locations={locationResults}
          episodes={episodeResults}
          selectedStatus={selectedStatus} />
      </section>
    </main>
  );
}
