#!/usr/bin/env python3
"""
Setup script for Prok Professional Networking Backend
"""

import os
import sys
from main import app, db, setup_database

def main():
    """Main setup function"""
    print("🚀 Setting up Prok Professional Networking Backend...")
    
    try:
        # Setup database
        print("📊 Setting up database...")
        setup_database()
        
        print("✅ Backend setup completed successfully!")
        print("\n📋 Next steps:")
        print("1. Make sure MySQL is running")
        print("2. Create database: CREATE DATABASE prok_db;")
        print("3. Update .env file with your database credentials")
        print("4. Run: python3 main.py")
        print("5. Test API: curl http://localhost:5000/api/health")
        
    except Exception as e:
        print(f"❌ Setup failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 