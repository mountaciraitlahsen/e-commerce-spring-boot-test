"use strict";
import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./component/header";
import ProductsCard from "./component/productsCard";
import { describe, expect, it } from "vitest";
import { products } from "./products";
function TestWrapper() {
  //   const [Products, setProducts] = useState(products);
  const Products = products;
  const Category = "All Categories";
  const sorting = "Newest";
  //   const [Category, setCategory] = useState("All Categories");
  //   const [sorting, setSorting] = useState("Newest");
  const [search, setSearch] = useState("");
  const [CartIds, setCartId] = useState([]);
  const [FavoriteIds, setFavId] = useState([]);
  const counterFavorite = FavoriteIds.length;
  const counterCart = CartIds.length;
  return (
    <>
      <header
        className="flex justify-around items-center gap-x-15 text-[20px] h-19 bg-[#FEFEFE] border-b shadow-[0_2px_4px_0px_rgba(0,0,0,0.05)] border-b-[#f4eded]"
        id="header"
      >
        <Header
          search={search}
          setSearch={setSearch}
          counterFavorite={counterFavorite}
          counterCart={counterCart}
        />
      </header>
      <ProductsCard
        search={search}
        Category={Category}
        Products={Products}
        FavoriteIds={FavoriteIds}
        setFavId={setFavId}
        CartIds={CartIds}
        setCartId={setCartId}
        sorting={sorting}
      ></ProductsCard>
    </>
  );
}
describe("Favorites Counter", () => {
  it("test header", () => {
    render(
      <MemoryRouter>
        <TestWrapper />
      </MemoryRouter>,
    );
    const headerCounter = screen.getByLabelText("Favorites Counter");
    expect(headerCounter).toHaveTextContent("Favorites (0)");
    // const addIntoFavorites = screen.getByLabelText("Add to favorites 1");
    const favoriteButtons = screen.getAllByRole("button", {
      name: /add to favorites/i,
    });
    favoriteButtons.forEach((button) => {
        fireEvent.click(button);
    })
    expect(headerCounter).toHaveTextContent("Favorites (4)");

    // const removeFromFavorites = screen.getByLabelText("Remove from favorites 1");
    // fireEvent.click(removeFromFavorites);
    // expect(headerCounter).toHaveTextContent("Favorites (0)");
  });
});
