// components/SearchBar.tsx
"use client";
import React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder = "Search stocks…" }: Props) {
  return (
    <div className="searchbar">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="searchbar__input"
        placeholder={placeholder}
        aria-label="Search stocks by symbol or name"
      />
    </div>
  );
}
