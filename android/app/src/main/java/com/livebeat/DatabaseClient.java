package com.livebeat;

import android.content.Context;
import androidx.room.Room;

import com.livebeat.Models.User;

import org.mindrot.jbcrypt.BCrypt;

import java.util.ArrayList;

public class DatabaseClient {

    private Context context;
    private static DatabaseClient instance;

    private AppDatabase appDatabase;

    private DatabaseClient(Context context) {
        this.context = context;
        appDatabase = Room.databaseBuilder(context, AppDatabase.class, "LiveBeatDatabase").build();
    }

    public static synchronized DatabaseClient getInstance(Context context) {
        if (instance == null) {
            instance = new DatabaseClient(context);
        }
        return instance;
    }

    public AppDatabase getAppDatabase() {
        return appDatabase;
    }

    public void initialize() {
        // Initialize the database with some default data if it is empty
        int numUsers = appDatabase.userDao().getAll().size();
        if (numUsers > 0) {
            return;
        }

        String salt = BCrypt.gensalt();
        ArrayList<String> likedEvents = new ArrayList<String>();
        likedEvents.add("event1");
        likedEvents.add("event2");

        User user1 = new User("admin", BCrypt.hashpw("admin", salt), likedEvents);

        likedEvents.clear();
        likedEvents.add("event3");
        likedEvents.add("event4");
        User user2 = new User("user1", BCrypt.hashpw("password1", salt), likedEvents);

        likedEvents.clear();
        likedEvents.add("event1");
        likedEvents.add("event5");
        likedEvents.add("event6");
        User user3 = new User("user2", BCrypt.hashpw("password2", salt), likedEvents);
        appDatabase.userDao().insertAll(user1, user2, user3);
    }
}