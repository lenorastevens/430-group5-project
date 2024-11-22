import Image from 'next/image';

const LogoImage = () => {
    return (
        <div className="logo">
            <Image
                src="/logo-no-background.png"
                alt="Logo"
                width={125}
                height={75}
            />
        </div>
    );
};

export default LogoImage;