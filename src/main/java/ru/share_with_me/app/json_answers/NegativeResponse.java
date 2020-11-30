package ru.share_with_me.app.json_answers;

public class NegativeResponse {
    private String error;
    public NegativeResponse(String a) { this.error = a; }

    public String getError() { return this.error; }
}
