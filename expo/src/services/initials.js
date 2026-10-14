function getInitials(name = "", lastname = "") {
    const names = name.trim().split(/\s+/).filter(Boolean);
    const lastnames = lastname.trim().split(/\s+/).filter(Boolean);

    let initials = "";

    if (names.length > 0) {
        initials += names[0][0].toUpperCase();
    }

    if (lastnames.length > 0) {
        initials += lastnames[0][0].toUpperCase();
    } else if (names.length > 1) {
        initials += names[1][0].toUpperCase();
    } else if (names[0]?.length > 1) {
        initials += names[0][1].toUpperCase();
    }

    return (initials + "XX").slice(0, 2);
}


export { getInitials }