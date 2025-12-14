// src/components/admin/ImageUploadForm.tsx
import React, { useState } from 'react';
import { supabase } from '../../db/SupabaseClient'; // Adjusted import to common path
import { Loader2, UploadCloud } from 'lucide-react'; 

const categories = ['Editorial', 'Commercial', 'Portrait', 'Events', 'Documentary', 'Art'];

const ImageUploadForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(categories[0]);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !title) {
            setMessage('Please select a file and enter a title.');
            return;
        }

        setLoading(true);
        setMessage('Uploading...');

        // Create a unique file path: portfolio/category/timestamp_filename
        const filePath = `portfolio/${category}/${Date.now()}_${file.name}`;
        
        // --- 1. UPLOAD IMAGE TO SUPABASE STORAGE ---
        const { data: storageData, error: storageError } = await supabase.storage
            .from('pdb') // <-- UPDATED BUCKET NAME
            .upload(filePath, file);

        if (storageError) {
            setLoading(false);
            setMessage(`Storage Error: ${storageError.message}`);
            return;
        }

        // Get the public URL for the image
        const publicUrl = supabase.storage
            .from('pdb') // <-- UPDATED BUCKET NAME
            .getPublicUrl(filePath).data.publicUrl;

        // --- 2. SAVE METADATA TO POSTGRES TABLE ---
        const { error: dbError } = await supabase
            .from('portfolio_images') // NOTE: KEEP THIS AS YOUR TABLE NAME
            .insert({ 
                title, 
                category, 
                image_url: publicUrl 
            });

        // 3. ERROR HANDLING & CLEANUP
        if (dbError) {
            setLoading(false);
            setMessage(`Database Error: ${dbError.message}. File may be orphaned.`);
            // Remove the file if the DB insert failed (using the correct bucket name)
            await supabase.storage.from('pdb').remove([filePath]); 
            return;
        }

        // 4. CLEAN UP
        setLoading(false);
        setMessage('Image uploaded successfully!');
        setTitle('');
        setFile(null);
    };

    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-white">
            <h3 className="text-3xl font-bold mb-6">Upload New Portfolio Item</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-amber-500 focus:border-amber-500"
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-amber-500 focus:border-amber-500"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                    <input
                        type="file"
                        id="file-upload"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                        <UploadCloud size={32} className="mx-auto text-amber-500 mb-3" />
                        <p className="text-sm font-medium">
                            {file ? file.name : 'Click to select image file'}
                        </p>
                    </label>
                </div>
                
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full p-3 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-600 transition duration-150 flex items-center justify-center"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin mr-2" size={20} />
                            Uploading...
                        </>
                    ) : (
                        'Upload Image'
                    )}
                </button>
            </form>
            {message && <p className={`mt-4 text-center text-sm ${message.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>{message}</p>}
        </div>
    );
};

export default ImageUploadForm;