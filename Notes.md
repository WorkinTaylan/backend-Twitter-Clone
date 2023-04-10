Database Tablo İlişkileri;

Roles tablosu, kullanıcıların rollerini içerir ve one-to-many ilişkisi ile Users tablosuyla bağlantılıdır.

Users tablosu, kayıtlı olan kullanıcıların bilgilerini saklar ve Tweets tablosu ile one-to-many ilişkisi kurmuştur. 

Tweets tablosu, kullanıcıların tweetlerini tutar ve one-to-many ilişkisi ile Users tablosu ile bağlantılıdır. 

Comments tablosu, kullanıcıların yorumları içindir ve one-to-many ilişkisi vardır. Bir kullanıcının birden fazla yorumu olsa da bir yorum tek bir kullanıcıya aittir.

Favs tablosu, kullanıcıların favori tweetlerini kaydeder ve Tweets ve Users tabloları ile one-to-many ilişkisi ile bağlantılıdır.

Favs_Users tablosu, kullanıcıların favori tweetlerinin kayıtlarının kullanıcıları ile bağlantısını sağlar. 

ONDELETE("RESTRICT") ====>>> bir kullanıcı silinmek istenirse, kullanıcının diğer tablolardaki referanslarının öncelikle silinmesi gerekir. Bu, kullanıcının favori tweetlerinin, yorumlarının veya oluşturduğu tweetlerin öncelikle silinmesi gerektiği anlamına gelir. Ancak bu işlem gerçekleştirilmezse, kullanıcının silinmesi engellenir.

Eğer kullanıcı ismi ve attığı twiti getirmek istersek;
SELECT Users.Username, Tweets.Content 
FROM Users 
LEFT JOIN Tweets 
ON Users.User_id = Tweets.User_id;

Eğer kullanıcı ismi, attığı tweetleri ve gelen yorumları görüntülemek istersek;
SELECT Users.Username, Tweets.Content, Comments.Comment
FROM Users 
LEFT JOIN Tweets on Users.User_id=Tweets.User_id
LEFT JOIN Comments on Tweets.Tweet_id=Comments.Tweet_id
