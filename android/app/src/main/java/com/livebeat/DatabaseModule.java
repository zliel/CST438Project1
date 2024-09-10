package com.livebeat;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.livebeat.Models.User;

import java.util.ArrayList;
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
        user.setPassword(null);
        promise.resolve(gson.toJson(user));
    }

    @ReactMethod
    public void getUserById(int id, Promise promise) {
        AppDatabase db = DatabaseClient.getInstance(getReactApplicationContext()).getAppDatabase();
        User user = db.userDao().findById(id);
        user.setPassword(null);
        promise.resolve(gson.toJson(user));
    }

    @ReactMethod
    public void insertUser(String username, String password, ArrayList<String> likedEvents, Promise promise) {
        AppDatabase db = DatabaseClient.getInstance(getReactApplicationContext()).getAppDatabase();
        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
        User user = new User(username, hashedPassword, likedEvents);
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
}