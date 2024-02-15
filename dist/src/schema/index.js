// const modules = [
//   require("./mutations"),
//   require("./schema"),
// ];
// console.log("modules==",modules);
// export const resolvers = modules.reduce((state, m) => {
//   if (!m.resolvers) {
//     return state;
//   }
//   return {
//     ...state,
//     ...m.resolvers
//   };
// }, {});
// // join all mutation types into single string
// export const typeDef = modules.map(m => m.typeDef).filter(res => !!res);
