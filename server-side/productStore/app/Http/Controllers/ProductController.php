<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $query = Product::with('category');

        //filter by category name
        if ($request->has('category_name') && !empty($request->category_name)) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->category_name . '%');
            });
        }

        // Filter by SKU
        if ($request->has('SKU') && !empty($request->SKU)) {
            $query->where('SKU', 'like', '%' . $request->SKU . '%');
        }

        //filter by price

        if ($request->filled('price')) {
            $query->where('price', $request->price);
        }
        // Filter by created date
        if ($request->has('created_date') && !empty($request->created_date)) {
            $query->whereDate('created_at', $request->created_date);
        }

        $products = $query->get();

        return response()->json($products);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {

            // return response("done");
            $request->validate([
                'name' => 'required|string|max:255',
                'price' => 'required|numeric',
                'SKU' => 'required|string|max:255|unique:products,SKU',
                'description' => 'required|string',
                'category_id' => 'required|exists:categories,id'
            ]);

            $product = Product::create($request->all());

            return response()->json($product, 201);

        } catch (\Throwable $th) {

            dd(throw $th);
        }
    }

    public function calculatePrice($store, $productId)
    {
        $product = Product::with('category')->findOrFail($productId);

        if ($store === 'A') {
            return $product->price;
        } elseif ($store === 'B') {
            return $product->price * (1 + $product->category->B_percentage / 100);
        }

        return response()->json(['error' => 'Invalid store'], 400);
    }

    public function search($query)
    {
        try {
            $data = Product::with('category')->where('name', 'like', '%' . $query . '%')->get();
            return response()->json($data, 201);
        } catch (\Throwable $th) {
            dd($th);
        }
    }
}
