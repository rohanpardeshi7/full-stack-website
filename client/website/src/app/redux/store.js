'use client'

import { configureStore } from "@reduxjs/toolkit"
import   userSlice  from "./userslice"

 export let store = configureStore({

    reducer:{
        userStore: userSlice
    }
})