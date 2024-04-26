import Navbar from "@/app/_components/Navbar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}

export default HomeLayout;