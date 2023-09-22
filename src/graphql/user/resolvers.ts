const queries = {};
const mutations = {
    createUser: (_: any, { }, { }) => {
        return "randomid";
    }
};

export const resolvers = { queries, mutations };