const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
    <footer className="footer">
        <p> &copy; {currentYear} WDD340-Group 5.</p>
    </footer>
    );
};

export default Footer;

