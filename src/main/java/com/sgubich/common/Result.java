package com.sgubich.common;


public class Result<T, ErrorCodeT extends ErrorCode> {
    private static final int SUCCESS = 0;
    private static final int FAILED = 1;
    private int status;
    private T result;
    private ErrorCodeT errorCode;


    private Result(int status, T result, ErrorCodeT errorCode) {
        this.status = status;
        this.result = result;
        this.errorCode = errorCode;
    }

    public static <T, ErrorCodeT extends ErrorCode> Result<T, ErrorCodeT> success(T result) {
        return new Result(0, result, (ErrorCode)null);
    }

    public static <T, ErrorCodeT extends ErrorCode> Result<T, ErrorCodeT> success() {
        return new Result(0, (Object)null, (ErrorCode)null);
    }

    public static <T, ErrorCodeT extends ErrorCode> Result<T, ErrorCodeT> failed(ErrorCodeT code) {
        return new Result(1, (Object)null, code);
    }

    public static <T, ErrorCodeT extends ErrorCode> Result<T, ErrorCodeT> failed(T result, ErrorCodeT code) {
        return new Result(1, result, code);
    }

    public boolean isSuccess() {
        return 0 == this.status;
    }

    public T getResult() {
        return this.result;
    }

    public int getStatus() {
        return this.status;
    }

    public ErrorCodeT getErrorCode() {
        return this.errorCode;
    }

    public String toString() {
        return "Result{status=" + this.status + ", result=" + this.result + ", errorCode=" + this.errorCode + '}';
    }
}
