# -*- coding:utf-8 -*-
import tkinter

# メインウィンドウ作成
app = tkinter.Tk()
app.geometry("600x400")
app.config(bg="#000000")
app.attributes('-fullscreen', True)

AppTitle = tkinter.Label(
    app,
    text="PRDMS列車制御",
    background="#000000",
    foreground="#ffffff",
    font=("Noto Sans JP", 16, "bold")
)
AppTitle.grid(
    column=0,
    row=0
)
# メインループ
app.mainloop()