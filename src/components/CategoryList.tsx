import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Category {
    id: string;
    name: string;
}

const CategoryList: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get<Category[]>('http://localhost:5600/api/category');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div>
            <h2>Categories</h2>
            <ul>
                {categories.map((category) => (
                    <li key={`${category.id}-${category.name}`}>{category.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
