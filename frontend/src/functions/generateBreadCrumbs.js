export const generateBreadcrumbs = (location, mainLabel, mainHref) => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    const breadcrumbs = [];
    // // Add "Home" breadcrumb if necessary
    // if (pathnames.includes('settings')) {
    //     breadcrumbs.push({ label: 'Home', href: '/' });
    // }
    breadcrumbs.push({ label: 'Home', href: '/' });


    if (mainLabel && mainHref) {
        // Add the main breadcrumb link (e.g., SearchVenue)
        breadcrumbs.push({ label: mainLabel, href: mainHref });
    }

    // Loop through the path segments to generate additional breadcrumbs
    pathnames.forEach((_, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;

        // Avoid adding segments that include the mainHref or are redundant
        if (routeTo !== mainHref && !routeTo.includes(mainHref)) {
            breadcrumbs.push({
                label: pathnames[index].charAt(0).toUpperCase() + pathnames[index].slice(1),
                href: routeTo,
            });
        }
    });

    return breadcrumbs;
};
