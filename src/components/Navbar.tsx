import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="left-nav">
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/customers">Customers</Link></li>
        <li><Link href="/sellers">Sellers</Link></li>
        <li><Link href="/product">Product</Link></li>
        <li><Link href="/cart">Cart</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
