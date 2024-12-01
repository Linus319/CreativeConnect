import { uploadProfileImage } from '@/lib/actions';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

// Mock dependencies
jest.mock('../utils/supabase/server', () => ({
  createClient: jest.fn()
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn()
}));

const mockSupabase = {
  auth: { 
    getUser: jest.fn(), 
  }, 
  storage: { 
    from: jest.fn().mockReturnThis(), 
    upload: jest.fn(), 
    getPublicUrl: jest.fn(), 
  }, 
  from: jest.fn().mockReturnThis(), 
  update: jest.fn().mockReturnThis(), 
  eq: jest.fn().mockReturnThis(), 
}; 

(createClient as jest.Mock).mockReturnValue(mockSupabase); 


describe('uploadProfileImage - Happy Paths', () => {

  beforeEach(() => { 
    // Reset all mock implementations before each test 
    jest.clearAllMocks(); 
    
    // Mock getUser to return a valid user 
    mockSupabase.auth.getUser.mockResolvedValue({ 
      data: { 
        user: { 
          email: 'test@example.com', 
        }, 
      }, 
    }); 
    
    // Mock upload and getPublicUrl methods 
    mockSupabase.storage.upload.mockResolvedValue({ data: {}, error: null }); 
    mockSupabase.storage.getPublicUrl.mockReturnValue({ 
      data: { publicUrl: 'https://example.com/profile-image.jpg' }, 
      error: null, 
    }); 
  });
 

  it('should successfully upload profile image', async () => {
    // Create a mock file
    const mockFile = new File(['test content'], 'test-image.jpg', { type: 'image/jpeg' });
    
    const formData = new FormData();
    formData.append('file', mockFile);

    await uploadProfileImage(formData);

    expect(mockSupabase.auth.getUser).toHaveBeenCalled();

    expect(mockSupabase.storage.from).toHaveBeenCalledWith('images');

    // capture arguments passed to  upload function
    const uploadCall = mockSupabase.storage.upload.mock.calls[0];
    const [uploadTitle, uploadedFile] = uploadCall;

    // verify image title contains email prefix
    expect(uploadTitle).toContain('test');

    // verify upload call
    expect(uploadedFile).toBe(mockFile);

    // verify public url 
    expect(mockSupabase.storage.getPublicUrl).toHaveBeenCalledWith(uploadTitle);

    // verify user profile update
    expect(mockSupabase.from).toHaveBeenCalledWith('users');
    expect(mockSupabase.update).toHaveBeenCalledWith({
      profile_image: 'https://example.com/profile-image.jpg'
    });
    expect(mockSupabase.eq).toHaveBeenCalledWith('email', 'test@example.com');

    // verify correct redirect
    expect(redirect).toHaveBeenCalledWith(
      `/profile/edit?email=test@example.com`
    );
  });

  it('handles different email formats', async () => {
    // Mock user with a different email format
    mockSupabase.auth.getUser = jest.fn().mockResolvedValue({
      data: { 
        user: { 
          email: 'john.doe@example.co.uk' 
        } 
      }
    });

    const mockFile = new File(['test content'], 'test-image.jpg', { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append('file', mockFile);

    await uploadProfileImage(formData);

    // Verify the title generation works with more complex email
    expect(mockSupabase.storage.upload).toHaveBeenCalledWith(
      expect.stringContaining('john.doe'),
      mockFile
    );
  });
});