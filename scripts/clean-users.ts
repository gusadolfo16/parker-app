/**
 * Script to clean all Google OAuth users and their data
 * This will:
 * 1. Unlock all photos
 * 2. Delete all sessions
 * 3. Delete all accounts (Google OAuth)
 * 4. Delete all users except the admin
 */

import { query } from '../src/platforms/postgres';

async function cleanUsers() {
    console.log('Starting user cleanup...\n');

    try {
        // 1. Unlock all photos
        console.log('1. Unlocking all photos...');
        await query(`
      UPDATE photos
      SET locked_by = NULL, locked_at = NULL
      WHERE locked_by IS NOT NULL
    `);
        console.log('   ✓ All photos unlocked\n');

        // 2. Delete all sessions
        console.log('2. Deleting all sessions...');
        const { rowCount: sessionsDeleted } = await query(`
      DELETE FROM sessions
    `);
        console.log(`   ✓ Deleted ${sessionsDeleted} sessions\n`);

        // 3. Delete all accounts (Google OAuth)
        console.log('3. Deleting all OAuth accounts...');
        const { rowCount: accountsDeleted } = await query(`
      DELETE FROM accounts
    `);
        console.log(`   ✓ Deleted ${accountsDeleted} accounts\n`);

        // 4. Delete all users except admin
        console.log('4. Deleting non-admin users...');
        const adminEmail = process.env.ADMIN_EMAIL;
        if (!adminEmail) {
            console.log('   ⚠ No ADMIN_EMAIL found in environment, skipping user deletion');
        } else {
            const { rowCount: usersDeleted } = await query(`
        DELETE FROM users
        WHERE email != $1
      `, [adminEmail]);
            console.log(`   ✓ Deleted ${usersDeleted} non-admin users\n`);
        }

        console.log('✅ Cleanup completed successfully!');
        console.log('\nYou can now:');
        console.log('1. Have users sign in with Google again');
        console.log('2. Select photos');
        console.log('3. Check the admin report to verify data is captured correctly\n');

    } catch (error) {
        console.error('❌ Error during cleanup:', error);
        process.exit(1);
    }

    process.exit(0);
}

cleanUsers();
