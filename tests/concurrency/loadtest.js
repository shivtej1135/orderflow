import axios from "axios";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzg3MzUxMDUyLCJleHAiOjE3ODczNTE5NTJ9.K11SPasrehW-14dhj9JMULA5vtiPV2RuwqXtC6TytJw";

const makeRequest = async () => {
    try {
        const response = await axios.post(
            "http://localhost:5000/orders",
            {
                items: [
                    {
                        product_id: 2,
                        quantity: 1,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        );

        return {
            success: true,
            data: response.data,
        };
    } catch (err) {
        return {
            success: false,
            message:
                err.response?.data?.message || err.message,
        };
    }
};

const run = async () => {
    const requests = [];

    for (let i = 0; i < 100; i++) {
        requests.push(makeRequest());
    }

    const results = await Promise.all(requests);

    const success = results.filter(
        (r) => r.success
    ).length;

    const failed = results.filter(
        (r) => !r.success
    ).length;

    console.log("Success:", success);
    console.log("Failed:", failed);
};

run();