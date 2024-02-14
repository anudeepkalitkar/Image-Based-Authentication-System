from flask_restful import Resource, fields
from flask_apispec import marshal_with, doc, use_kwargs
from marshmallow import Schema, fields
from flask_apispec.views import MethodResource
from Creds import MONGO_URL
from pymongo.mongo_client import MongoClient
from flask_cors import cross_origin


class IBASICONRegisterReqParams(Schema):
    Fname = fields.String(required=True, description="First Name")
    Lname = fields.String(required=True, description="Last Name")
    Uname = fields.String(required=True, description="User Name")
    Email = fields.Email(required=True, description="Email ID")
    Phno = fields.String(required=False, description="Phone number")
    Password = fields.String(required=False, description="Password")


class IBASICONRegisterResParams(Schema):
    success = fields.Boolean(required=True, description="success")
    error = fields.String(required=False, description="Error")


class IBASICONRegister(MethodResource, Resource):
    @doc(description="", tags=["IBASICON"])
    @use_kwargs(IBASICONRegisterReqParams, location=("json"))
    @marshal_with(IBASICONRegisterResParams)
    @cross_origin()
    def post(self, **args):
        mongoDB = MongoClient(MONGO_URL).IBAS_Icons

        userinfo = mongoDB.Userinfo.find_one({"Username": args["Uname"]})
        try:
            if not (userinfo):
                updatedUserinfo = mongoDB.Userinfo.insert_one(
                    {
                        "Firstname": args["Fname"],
                        "Lastname": args["Lname"],
                        "Username": args["Uname"],
                        "Email": args["Email"],
                        "Phno": args["Phno"],
                        "Password": args["Password"],
                    }
                )
                return {"success": True}
            else:
                if userinfo["Email"] == args["Email"]:
                    return {
                        "success": False,
                        "error": "User Already Exsists, please Login",
                    }
                else:
                    return {
                        "success": False,
                        "error": "User Already Exsists, please use a different username",
                    }

        except Exception as e:
            return {"success": False, "error": str(e)}


class IBASICONLoginReqParams(Schema):
    Uname = fields.String(required=True, description="User Name")
    Password = fields.String(required=False, description="Password")


class IBASICONLoginResParams(Schema):
    success = fields.Boolean(required=True, description="success")
    error = fields.String(required=False, description="Error")


class IBASICONLogin(MethodResource, Resource):
    @doc(description="", tags=["IBASICON"])
    @use_kwargs(IBASICONLoginReqParams, location=("json"))
    @marshal_with(IBASICONLoginResParams)
    @cross_origin()
    def post(self, **args):
        mongoDB = MongoClient(MONGO_URL).IBAS_Icons

        userinfo = mongoDB.Userinfo.find_one({"Username": args["Uname"]})
        try:
            if not (userinfo):
                return {
                    "success": False,
                    "error": "User Does not exists",
                }
            else:
                if userinfo["Password"] == args["Password"]:
                    return {
                        "success": True,
                    }
                else:
                    return {
                        "success": False,
                        "error": "Invalid Password",
                    }

        except Exception as e:
            return {"success": False, "error": str(e)}
