export default async (err, req, res, next) => {
    console.log(111);
    res.status(500).json({ message: 'Something went wrong!', error: err?.message});
}