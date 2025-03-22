function Layout({ children }) {
    return (
        <div className="containter pt-5 mt-5">
            {children}
            <p>Tom's footer</p>
        </div>
    );
}

export default Layout;