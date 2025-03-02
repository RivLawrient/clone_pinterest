
CREATE TABLE users
(
	id VARCHAR(100) NOT NULL,
	username VARCHAR(100) NOT NULL,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100),
	email VARCHAR(100) NOT NULL,
	password VARCHAR(100),
	is_google BOOLEAN NOT NULL DEFAULT FALSE,
	is_facebook BOOLEAN NOT NULL DEFAULT FALSE,
	birth_date DATE,
	profile_img VARCHAR(255),
	token VARCHAR(100) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	UNIQUE (email),
	UNIQUE (username)
);


CREATE TABLE post (
	id VARCHAR(100) NOT NULL,
	user_id VARCHAR(100) NOT NULL,
	title VARCHAR(100),
	description VARCHAR(100),
	image VARCHAR(100) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	UNIQUE (image),
	CONSTRAINT fk_user_post FOREIGN KEY (user_id) REFERENCES users (id)
);


CREATE TABLE follow (
	id VARCHAR(100) NOT NULL,
	follower_id VARCHAR(100) NOT NULL,
	following_id VARCHAR(100) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	CONSTRAINT fk_follower_user FOREIGN KEY (follower_id) REFERENCES users (id),
	CONSTRAINT fk_following_user FOREIGN KEY (following_id) REFERENCES users (id)
);

CREATE TABLE save (
    id VARCHAR(100) NOT NULL,
    user_id VARCHAR(100) NOT NULL,
    post_id VARCHAR(100) NOT NULL,
    created_at BIGINT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_save_user FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT fk_save_post FOREIGN KEY (post_id) REFERENCES post (id) ON DELETE CASCADE
);

CREATE TABLE like_post (
    id VARCHAR(100) NOT NULL,
    user_id VARCHAR(100) NOT NULL,
    post_id VARCHAR(100) NOT NULL,
    created_at BIGINT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_like_post_user FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT fk_like_post_post FOREIGN KEY (post_id) REFERENCES post (id) ON DELETE CASCADE
);

CREATE TABLE comment (
    id VARCHAR(100) NOT NULL,
    comment VARCHAR(100) NOT NULL,
    user_id VARCHAR(100) NOT NULL,
    post_id VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_comment_user FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT fk_comment_post FOREIGN KEY (post_id) REFERENCES post (id) ON DELETE CASCADE
);
