export const generateBreadcrumbs = (location, mainLabel, mainHref, lastName='') => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    const breadcrumbs = [];
    breadcrumbs.push({ label: 'Home', href: '/' });


    if (mainLabel && mainHref) {
        // Add the main breadcrumb link (e.g., SearchVenue)
        breadcrumbs.push({ label: mainLabel, href: mainHref });
    }

    // Regular expression to identify IDs (e.g., alphanumeric or numeric strings)
    const idPattern = /^[a-f\d]{24}$/i; // Adjust the pattern if your IDs differ (e.g., MongoDB's ObjectId)

    // Loop through the path segments to generate additional breadcrumbs
    pathnames.forEach((segment, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        // Only exclude the last segment if it looks like an ID
        const isLastSegment = index === pathnames.length - 1;
        // Avoid adding segments that include the mainHref or are redundant
        if (!(isLastSegment && idPattern.test(segment)) && routeTo !== mainHref && !routeTo.includes(mainHref)) {
            breadcrumbs.push({
                label: pathnames[index].charAt(0).toUpperCase() + pathnames[index].slice(1),
                href: routeTo,
            });
        }
    });

    // Push the last name as the last breadcrumb if available
    if (lastName != '') {
        breadcrumbs.push({
            label: lastName,
        });
    }

    return breadcrumbs;
};
