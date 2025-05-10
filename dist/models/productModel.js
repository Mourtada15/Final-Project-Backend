"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const productSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    condition: {
        type: String,
        enum: ['New', 'Used - like new', 'Used - good', 'Used - fair'],
        default: 'New',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true
    },
    subCategoryID: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    }
}, { timestamps: true });
// Create a text index on the title and description fields
productSchema.index({ title: 'text', description: 'text' });
productSchema.pre("find", function (next) {
    this.populate(["subCategoryID"]);
    next();
});
productSchema.pre("findOne", function (next) {
    this.populate(["subCategoryID"]);
    next();
});
exports.default = mongoose_1.default.model('Product', productSchema);
