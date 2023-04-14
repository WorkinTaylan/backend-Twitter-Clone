/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const defaultRoles=[
  {Rolename:"Admin"},
  {Rolename:"User"}
]
const defaultUsers=[
  {User_id:"ce9e87e0-2837-11ec-8d3d-0242ac130003", Username:"Scooby-Doo", Password:"$2y$08$U47ZyrsCBOgZGRWRvq7NIujl2SmoZHAnM9NVUNZyDlR/AF6Cn2/HW", Email:"scooby@Doo.com", Phone:53253253253, Role_id:1}, //password=Scooby123
  {User_id:"d1ab41a0-2837-11ec-8d3d-0242ac130003", Username:"Shaggy", Password:"$2y$08$xAOcQeco9meH3xnuIcbh.uuNYmFmFit7ZyIeDFRRmFqzEwZ9Drraa", Email:"shaggy@mail.com", Phone:55555555, Role_id:2}
]

const defaultTweets=[
  {Tweet_id:"d5080170-2837-11ec-8d3d-0242ac130003", Content:"Kesin bilgi yayalım", User_id:"ce9e87e0-2837-11ec-8d3d-0242ac130003"},
  {Tweet_id:"d69b1f70-2837-11ec-8d3d-0242ac130003", Content:"Birtakım siyasi tweetler", User_id:"ce9e87e0-2837-11ec-8d3d-0242ac130003"},
  {Tweet_id:"d69b1f71-2837-11ec-8d3d-0242ac130003", Content:"Bu pozisyon net ofsayt!", User_id:"d1ab41a0-2837-11ec-8d3d-0242ac130003"},
]

const defaultComments=[
  {Comment:"Kesin bilgi olduğuna emin misin?", User_id:"ce9e87e0-2837-11ec-8d3d-0242ac130003",Tweet_id:"d5080170-2837-11ec-8d3d-0242ac130003"},
  {Comment:"YÖNETİM İSTİFA!", User_id:"d1ab41a0-2837-11ec-8d3d-0242ac130003",Tweet_id:"d69b1f71-2837-11ec-8d3d-0242ac130003"},
  {Comment:"Haklısın bence şike var!", User_id:"d1ab41a0-2837-11ec-8d3d-0242ac130003",Tweet_id:"d69b1f71-2837-11ec-8d3d-0242ac130003"},
]

exports.seed = async function(knex) {
  
  await knex("Roles").truncate();
  await knex("Users").truncate();
  await knex("Tweets").truncate();
  await knex("Comments").truncate();

  await knex('Roles').insert(defaultRoles);
  await knex('Users').insert(defaultUsers);
  await knex('Tweets').insert(defaultTweets);
  await knex('Comments').insert(defaultComments);
};
