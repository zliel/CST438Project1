package com.livebeat;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;
import com.livebeat.Models.User;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.google.gson.Gson;

import org.mindrot.jbcrypt.BCrypt;


public class DatabaseModule extends ReactContextBaseJavaModule {
    private final Gson gson = new Gson();

    public DatabaseModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    @NonNull
    public String getName() {
        return "DatabaseModule";
    }

    @ReactMethod
    public void getAllUsers(Promise promise) {
        AppDatabase db = DatabaseClient.getInstance(getReactApplicationContext()).getAppDatabase();
        List<User> users = db.userDao().getAll();
        for (User user : users) {
            user.setPassword(null);
        }
        promise.resolve(gson.toJson(users));
    }

    @ReactMethod
    public void getUserByUsername(String username, Promise promise) {
        AppDatabase db = DatabaseClient.getInstance(getReactApplicationContext()).getAppDatabase();
        User user = db.userDao().findByUsername(username);
        if (user != null) {
            user.setPassword(null);
            promise.resolve(gson.toJson(user));
        } else {
            promise.resolve(null);
        }
    }

    @ReactMethod
    public void getUserById(int id, Promise promise) {
        AppDatabase db = DatabaseClient.getInstance(getReactApplicationContext()).getAppDatabase();
        User user = db.userDao().findById(id);
        user.setPassword(null);
        promise.resolve(gson.toJson(user));
    }

    @ReactMethod
    public void insertUser(String username, String password, ReadableArray likedEvents, Promise promise) {
        AppDatabase db = DatabaseClient.getInstance(getReactApplicationContext()).getAppDatabase();
        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
        ArrayList<String> likedEventsList = new ArrayList<String>();
        for (int i = 0; i < likedEvents.size(); i++) {
            likedEventsList.add(likedEvents.getString(i));
        }
        User user = new User(username, hashedPassword, likedEventsList);
        db.userDao().insert(user);
        user.setPassword(null);
        promise.resolve(gson.toJson(user));
    }

    @ReactMethod
    public User login(String username, String password, Promise promise) {
        AppDatabase db = DatabaseClient.getInstance(getReactApplicationContext()).getAppDatabase();
        User user = db.userDao().findByUsername(username);

        if (user == null) {
            return null;
        }
        if (BCrypt.checkpw(password, user.getPassword())) {
            user.setPassword(null);
            promise.resolve(gson.toJson(user));
        }
        return null;
    }

    @ReactMethod
    public void updateUser(int id, String username, String password, ArrayList<String> likedEvents, Promise promise) {
        AppDatabase db = DatabaseClient.getInstance(getReactApplicationContext()).getAppDatabase();
        User user = db.userDao().findById(id);
        if (user != null) {
            user.setUsername(username);
            user.setPassword(BCrypt.hashpw(password, BCrypt.gensalt()));
            user.setLikedEvents(likedEvents);
            db.userDao().update(user);
            user.setPassword(null);
            promise.resolve(gson.toJson(user));
        } else {
            promise.reject("Error", "User not found");
        }
    }

    @ReactMethod
    public User likeEvent(int id, String eventId, Promise promise) {
        AppDatabase db = DatabaseClient.getInstance(getReactApplicationContext()).getAppDatabase();
        User user = db.userDao().findById(id);
        if (user != null) {
            user.getLikedEvents().add(eventId);
            db.userDao().update(user);
            user.setPassword(null);
            promise.resolve(gson.toJson(user));
        } else {
            promise.reject("Error", "User not found");
        }
        return null;
    }

    @ReactMethod
    public User unlikeEvent(int id, String eventId, Promise promise) {
        AppDatabase db = DatabaseClient.getInstance(getReactApplicationContext()).getAppDatabase();
        User user = db.userDao().findById(id);
        if (user != null) {
            user.getLikedEvents().remove(eventId);
            db.userDao().update(user);
            user.setPassword(null);
            promise.resolve(gson.toJson(user));
        } else {
            promise.reject("Error", "User not found");
        }
        return null;
    }
}