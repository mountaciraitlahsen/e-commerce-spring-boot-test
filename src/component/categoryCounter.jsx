import { useMemo} from "react";
export default function CategoryCounter({Category, Products, search}) {
  const productCount = useMemo(() => {
  if (Category === 'All Categories') {
    return Products.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())).length;
  }
  return Products.filter((e) => e.category === Category && e.name.toLowerCase().includes(search.toLowerCase())).length;
}, [Category, Products, search]);
  return (
    <p className="text-sm text-gray-500">
      <span className="text-base font-semibold text-gray-900 mr-1">{productCount}
      </span>
      Products Found
    </p>
  );
}
