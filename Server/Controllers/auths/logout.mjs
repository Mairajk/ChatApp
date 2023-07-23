


export default async (req, res) => {
    res.cookie('Token', '', {
        maxAge: 1,
        httpOnly: true,
    });

    res.json({
        message: 'Logout successfully',
    });
};