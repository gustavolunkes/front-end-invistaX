import axios, { Axios, type AxiosInstance }  from "axios";
import { ImovelRoute } from "./route/imovel/imovelRoute";
import { CityRoute } from "./route/city/cityRoute";
import { ExpenseRoute } from "./route/expense/expenseRoute";
import { RenevueRoute } from "./route/renevue/renevueRoute";
import { OwenerRoute } from "./route/owner/ownerRoute";
import { UserRoute } from "./route/user/userRoute";
import { ValuationRoute } from "./route/valuation/valuationRoute";

const server = axios.create({
    baseURL: "http://localhost:8080"
})

export class Api{
    imovel = new ImovelRoute(server)
    city = new CityRoute(server)
    expense = new ExpenseRoute(server)
    renevue = new RenevueRoute(server)
    owner = new OwenerRoute(server)
    user = new UserRoute(server)
    valuation = new ValuationRoute(server)
    
}