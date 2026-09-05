const errorHandler = (err, req, res, next) => {
     console.log("ERROR HANDLER:", err.message);
    res.status(err.statusCode || 500).json({
        
        message: err.message || "Internal Server Error"
    });
};

export default errorHandler;