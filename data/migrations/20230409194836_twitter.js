/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable("Roles", tbl=>{
        tbl.increments("Role_id")
        tbl.string("Rolename")
            .notNullable()
            .unique()
    })
    .createTable("Users", tbl=>{
        tbl.uuid("User_id").primary()
        tbl.string("Username", 32)
            .notNullable()
            .unique()
        tbl.string("Password",255)
            .notNullable()
        tbl.string("Email")
            .unique()
            .notNullable()
            .comment("This is an email field")
        tbl.integer("Phone",12)
            .unique()
            .notNullable()
            .unsigned()
            .comment("Do not forget area code")
        tbl.string("Avatar")
            .defaultTo("https://ih1.redbubble.net/image.431122825.4389/st,small,507x507-pad,600x600,f8f8f8.u3.jpg")
        tbl.string("Role_id")
            .references("Role_id")
            .inTable("Roles")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
    })
    .createTable("Tweets", tbl=>{
        tbl.uuid("Tweet_id").primary()
        tbl.string("Content")
            .defaultTo("deneme")
        tbl.timestamps(true,true)
        tbl.integer("User_id")
            .references("User_id")
            .inTable("Users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
    })
    .createTable("Comments", tbl=>{
        tbl.increments("Comment_id")
        tbl.string("Comment", 255)
        tbl.integer("Tweet_id")
            .references("Tweet_id")
            .inTable("Tweets")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        tbl.integer("User_id")
            .references("User_id")
            .inTable("Users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
    })
    .createTable("Favs", tbl=>{
        tbl.increments("Fav_id")
        tbl.integer("Tweet_id")
            .references("Tweet_id")
            .inTable("Tweets")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        tbl.integer("User_id")
            .references("User_id")
            .inTable("Users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
    })
    .createTable("Favs_Users", tbl=>{
        tbl.integer("User_id")
            .references("User_id")
            .inTable("Users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        tbl.integer("Fav_id")
            .references("Fav_id")
            .inTable("Favs")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        tbl.primary(["User_id","Fav_id"])
    })      
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
            .dropTableIfExists("Favs_Users")
            .dropTableIfExists("Favs")
            .dropTableIfExists("Comments")
            .dropTableIfExists("Tweets")
            .dropTableIfExists("Users")
            .dropTableIfExists("Roles")
};
